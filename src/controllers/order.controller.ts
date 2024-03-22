import catchAsync from '../utils/catchAsync';
import queryString from 'qs';
import crypto, { sign } from 'crypto';
import moment from 'moment';
import { Request, Response, NextFunction } from 'express';
import AppError from '~/utils/appError';
class OrderController {
  public CreateVnPayPayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (req.method === 'OPTIONS') {
          res.status(200).send();
          return;
        }
        const { amount = 10000, bankCode, language } = req.body;

        process.env.TZ = 'Asia/Ho_Chi_Minh';
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        let ipAddr =
          req.headers['x-forwarded-for'] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress;
        if (Array.isArray(ipAddr)) {
          ipAddr = ipAddr[0];
        }

        let tmnCode = process.env.VNP_TMNCODE;
        let secretKey = process.env.VNP_HASHSECRET;
        let vnpUrl = process.env.VNP_URL;
        let returnUrl = 'http://localhost:8080/api/v1/order/vnp/return';
        let orderId = moment(date).format("DDHHmmss");
        let locale = language;
        if (locale === null || locale === '') {
          locale = 'vn';
        }
        let currCode = 'VND';
        let vnp_Params: Record<string, string | number> = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = String(tmnCode);
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = String(returnUrl);
        vnp_Params['vnp_IpAddr'] = String(ipAddr);
        vnp_Params['vnp_CreateDate'] = createDate;
        if (typeof bankCode !== 'undefined' && bankCode !== '') {
          vnp_Params['vnp_BankCode'] = bankCode;
        }
        vnp_Params = sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require('crypto');
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        if (!vnpUrl) {
          return next(new AppError('Invalid vnpURL', 400));
        }
        return res.status(201).json({
          success: true,
          data: vnpUrl
        });
      } catch (error: any) {
        return next(new AppError('Internal Server Error', 500));
      }
    }
  );

  public getReturnPayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const vnp_Params = req.query;
      const amount = req.query.vnp_Amount;
      const secureHash = vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHashType'];
      const SORTED_vnp_Params = sortObject(Object(vnp_Params));
      const tmnCode = process.env.VNP_TMNCODE;
      const secretKey = process.env.VNP_HASHSECRET || '';
      const signData = queryString.stringify(SORTED_vnp_Params, {
        encode: false
      });
      const hmac = crypto.createHmac('sha512', secretKey);
      const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
      const order_id = req.query.vnp_TxnRef;
      console.log('secureHash', secureHash);
      console.log('order_id', order_id);
      console.log('signed', signed);
      if (secureHash === signed) {
        const returnUrl = 'http://localhost:3000';
        // const redirectUrl = `${returnUrl}?order_id=${order_id}&amount=${amount}`;
        res.redirect(returnUrl);
        console.log('result:', vnp_Params);
      } else {
        res.render('failed', { code: '97' });
      }
    }
  );
}

interface AnyObject {
  [key: string]: string | number;
}
function sortObject(obj: AnyObject): AnyObject {
  let sorted: AnyObject = {};
  let str: string[] = Object.keys(obj).map(encodeURIComponent);

  str.sort();

  for (const key of str) {
    const value: string | number = obj[key];
    sorted[key] = encodeURIComponent(value.toString()).replace(/%20/g, '+');
  }

  return sorted;
}
export default new OrderController();
