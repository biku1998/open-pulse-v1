import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PostgresError } from 'postgres';
import { DatabaseService } from 'src/database/database.service';
import { Database } from 'src/types/supabase-db';

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
        Pick<Database['public']['Tables']['charts']['Row'], 'id'>[]
      >`SELECT id FROM public.charts WHERE id = ${id} AND created_by = ${userId}`;

      if (charts.length === 0) {
        throw new NotFoundException('chart does not exist');
      }

      // check if the chart has any condition and aggregations attached
      const conditions = await this.databaseService.sql<
        Database['public']['Tables']['chart_conditions']['Row'][]
      >`SELECT * FROM public.chart_conditions WHERE chart_id = ${id} AND created_by = ${userId}`;

      if (conditions.length === 0) {
        throw new BadRequestException('chart does not have any conditions');
      }

      const aggregations = await this.databaseService.sql<
        Database['public']['Tables']['chart_aggregations']['Row'][]
      >`SELECT * FROM public.chart_aggregations WHERE chart_id = ${id} AND created_by = ${userId}`;

      if (aggregations.length === 0) {
        throw new BadRequestException('chart does not have any aggregations');
      }

      return this.filterEventsByChartConditions(conditions);
    } catch (error) {
      if (error instanceof PostgresError) {
        this.logger.error(
          `[${this.getChartData.name}]  Postgres error: ${error.message}`,
        );
        throw new InternalServerErrorException('database error');
      }
    }
  }

  async filterEventsByChartConditions(
    conditions: Database['public']['Tables']['chart_conditions']['Row'][],
  ) {
    this.logger.log(
      `${
        this.filterEventsByChartConditions.name
      } called with conditions [${JSON.stringify(conditions)}]`,
    );

    try {
      const events: Database['public']['Tables']['events']['Row'][] = [];

      // check for event_name condition
      const eventNameConditions = conditions.filter(
        (condition) => condition.field === 'EVENT_NAME',
      );

      if (eventNameConditions.length > 0) {
        const filteredEventsByName = await this.databaseService.sql<
          Database['public']['Tables']['events']['Row'][]
        >`SELECT * FROM public.events WHERE name = ANY(
            ${this.databaseService.sql.array(
              eventNameConditions.map((condition) => condition.value),
            )}
        )`;

        events.push(...filteredEventsByName);
      }

      return events;
    } catch (error) {
      if (error instanceof PostgresError) {
        this.logger.error(
          `[${this.filterEventsByChartConditions.name}]  Postgres error: ${error.message}`,
        );
        throw new InternalServerErrorException('database error');
      }
    }
  }
}
