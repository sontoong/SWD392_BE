import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Wellancer API Documentation',
      version: '1.0.0',
      description: 'Wellancer API Documentation'
    },
    basePath: '/api/v1',
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server'
      }
    ]
  },
  apis: [`${__dirname}/../routes/*.route.ts`],
  explorer: true
};

const specs = swaggerJSDoc(options);

export default specs;
