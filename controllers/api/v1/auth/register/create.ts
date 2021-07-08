import { Request, Response } from 'express';

export default function (req: Request, res: Response): void {
  console.log(req.body);
  res.status(200).send();
}
