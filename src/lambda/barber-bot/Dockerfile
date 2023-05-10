FROM public.ecr.aws/lambda/nodejs:18

COPY ./config-files/* app.ts ${LAMBDA_TASK_ROOT}

RUN npm ci
RUN npm run build
RUN rm *.ts

CMD ["app.handler"]
