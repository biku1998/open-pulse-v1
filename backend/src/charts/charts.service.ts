import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PostgresError } from 'postgres';
import { DatabaseService } from 'src/database/database.service';
import { Tables } from 'src/types/supabase-db';

// type EventNameCondition = Omit<Tables<'chart_conditions'>, 'field'> & {
//   field: 'EVENT_NAME';
// };

// type EventTagCondition = Omit<Tables<'chart_conditions'>, 'field'> & {
//   field: 'TAG_KEY' | 'TAG_VALUE';
// };

@Injectable()
export class ChartsService {
  private readonly logger = new Logger(ChartsService.name);
  constructor(private readonly databaseService: DatabaseService) {}

  async getChartData(id: number, userId: string) {
    this.logger.log(
      `${this.getChartData.name} called with id [${id}], userId [${userId}]`,
    );
    try {
      // check if chart exists
      const charts = await this.databaseService.sql<
        Pick<Tables<'charts'>, 'id'>[]
      >`SELECT id FROM public.charts WHERE id = ${id} AND created_by = ${userId}`;

      if (charts.length === 0) {
        throw new NotFoundException('chart does not exist');
      }

      // check if the chart has any condition and aggregations attached
      const conditions = await this.databaseService.sql<
        Tables<'chart_conditions'>[]
      >`SELECT * FROM public.chart_conditions WHERE chart_id = ${id} AND created_by = ${userId}`;

      if (conditions.length === 0) {
        throw new BadRequestException('chart does not have any conditions');
      }

      const aggregations = await this.databaseService.sql<
        Tables<'chart_aggregations'>[]
      >`SELECT * FROM public.chart_aggregations WHERE chart_id = ${id} AND created_by = ${userId}`;

      if (aggregations.length === 0) {
        throw new BadRequestException('chart does not have any aggregations');
      }

      const nestedConditionsArr: Tables<'chart_conditions'>[][] = [];
      const childConditionIds: number[] = [];

      conditions.forEach((condition) => {
        const childConditions = conditions.filter(
          (c) => c.parent_id === condition.id,
        );

        if (childConditions.length === 0) {
          if (childConditionIds.includes(Number(condition.id)) === false) {
            nestedConditionsArr.push([condition]);
          }
        } else {
          childConditionIds.push(...childConditions.map((c) => Number(c.id)));
          nestedConditionsArr.push([condition, ...childConditions]);
        }
      });

      // return this.filterEventsByChartConditions(conditions);
    } catch (error) {
      if (error instanceof PostgresError) {
        this.logger.error(
          `[${this.getChartData.name}]  Postgres error: ${error.message}`,
        );
        throw new InternalServerErrorException('database error');
      }
      throw error;
    }
  }

  async filterEventsByChartConditions(
    conditions: Tables<'chart_conditions'>[],
  ) {
    this.logger.log(
      `${
        this.filterEventsByChartConditions.name
      } called with conditions [${JSON.stringify(conditions)}]`,
    );

    try {
      const events: Tables<'events'>[] = [];

      // TODO: if it works, call these two functions in parallel
      const filteredEventsByEventNameConditions =
        await this.filterEventsByEventNameConditions(
          conditions.filter((condition) => condition.field === 'EVENT_NAME'),
        );

      events.push(...filteredEventsByEventNameConditions);

      const filteredEventsByEventTagConditions =
        await this.filterEventsByEventTagConditions(
          conditions.filter(
            (condition) =>
              condition.field === 'TAG_KEY' || condition.field === 'TAG_VALUE',
          ),
        );

      events.push(...filteredEventsByEventTagConditions);

      return {
        count: events.length,
        data: events,
      };
    } catch (error) {
      if (error instanceof PostgresError) {
        this.logger.error(
          `[${this.filterEventsByChartConditions.name}]  Postgres error: ${error.message}`,
        );
        throw new InternalServerErrorException('database error');
      }
    }
  }

  async filterEventsByEventNameConditions(
    conditions: Tables<'chart_conditions'>[],
  ): Promise<Tables<'events'>[]> {
    if (conditions.length === 0) return [];

    if (conditions.some((condition) => condition.field !== 'EVENT_NAME'))
      return [];

    let whereCondition = '';

    conditions.forEach((condition) => {
      const childConditions = conditions.filter(
        (c) => c.parent_id === condition.id,
      );

      if (childConditions.length > 0) {
        whereCondition += '(';
        childConditions.forEach((childCondition) => {
          whereCondition += `name ${
            childCondition.operator === 'EQUALS' ? '=' : '<>'
          } '${childCondition.value}' ${childCondition.logical_operator}`;
        });
        whereCondition += ` name = '${condition.value}')`;
      } else {
        if (condition.parent_id === null) {
          if (whereCondition === '') {
            whereCondition += `name ${
              condition.operator === 'EQUALS' ? '=' : '<>'
            } '${condition.value}'`;
          } else {
            whereCondition += ` OR name ${
              condition.operator === 'EQUALS' ? '=' : '<>'
            } '${condition.value}'`;
          }
        }
      }
    });

    const events = await this.databaseService.sql<Tables<'events'>[]>`
      SELECT * FROM public.events WHERE ${this.databaseService.sql.unsafe(
        whereCondition,
      )}`;

    return events;
  }

  async filterEventsByEventTagConditions(
    conditions: Tables<'chart_conditions'>[],
  ): Promise<Tables<'events'>[]> {
    return [];
  }
}
