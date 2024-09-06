import { Injectable } from '@nestjs/common';
import { PaginationInterface } from '../interface/pagination.interface';
@Injectable()
export class PaginationHelper {
  convertPageToSkip(page: number, size: number): number {
    return (page - 1) * size;
  }
  getPagination(query: PaginationInterface): {
    take: number;
    skip: number;
  } {
    let pagination: {
      take: number;
      skip: number;
    };
    if (query.page && query.size) {
      pagination = {
        take: query.size,
        skip: this.convertPageToSkip(query.page, query.size),
      };
    } else {
      pagination = {
        take: 10,
        skip: 0,
      };
    }
    return pagination;
  }
}
