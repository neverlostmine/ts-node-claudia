import * as express from 'express';

import { DocName } from '../../enum/docName';
import { ITodo } from '../../interface/todo';
import { Validator } from '../../joi/share/validator';
import { QueryTodoSchema } from '../../joi/todo';
import { FindAll } from '../commonActions/findAll';

export const TodoAll = async (req: express.Request) => {
  const query = await Validator<ITodo>(req.query, QueryTodoSchema);
  const conditions: any = {};
  if (query.Title) {
    conditions.Title = { $regex: query.Title }
  }
  const docs = await FindAll<ITodo>(conditions, DocName.Todos);
  return { statusCode: 200, data: docs };
};