import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express"

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUIOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link{
            content: url('/media/logo.png');
            height: 120px;
            width: auto;
        }
        .swagger-ui .topbar{
            background-color: black;
        }
    `,
    customSiteTitle: 'REST API Express / Typescript DOCUMENTATION',
    customfavIcon: '/media/favicon.png'
}
export default swaggerSpec

export {
    swaggerUIOptions
}