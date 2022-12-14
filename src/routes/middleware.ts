import { Request, Response, NextFunction } from 'express';

import { UnauthorizedError, BadRequestError } from '@errors/customErrors';
import wrapAsync from '@utils/wrapAsync';

export const isLoggedIn = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      throw new UnauthorizedError('로그인이 필요한 요청입니다.');
    }

    next();
  },
);

export const isNotLoggedIn = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      throw new BadRequestError('로그아웃이 필요한 요청입니다.');
    }

    next();
  },
);

export const checkUserType = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      req.isAdmin = true;
    }

    next();
  },
);
