import router from './router';

export function success(res, data) {
  const result = {
    success: true,
    ...data,
  };

  res.status(200).send(result);
}

export function reject(res, error, data) {
  const result = {
    success: false,
    error,
    data,
  };

  res.status(400).send(result);
}

export default router;
