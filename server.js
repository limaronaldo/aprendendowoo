const next = require( 'next' );
const express = require( 'express');
const wooConfig = require( './wooConfig' );

// const WooCommerceAPI = require('woocommerce-api');

// const WooCommerce = new WooCommerceAPI({
//     url: wooConfig.siteUrl,
//     consumerKey: wooConfig.consumerKey,
//     consumerSecret: wooConfig.consumerSecret,
//     wpAPI: true,
//     version: 'wc/v1'
// });

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM

const WooCommerce = new WooCommerceRestApi({
    url: wooConfig.siteUrl,
    consumerKey: wooConfig.consumerKey,
    consumerSecret: wooConfig.consumerSecret,
  version: 'wc/v3'
});

const port = 3000;
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then( () => {
        const server = express();

        server.get( '/getProducts', ( req, response ) => {
            // WooCommerce.getAsync('products').then(function(result) {
            //     return JSON.parse(result.toJSON().body);
            //   });
            WooCommerce.get("products")
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        server.get( '*', ( req, res ) => {
            return handle( req, res );
        } );

        server.listen( port, err => {
            if (err) throw err
            console.log(`> Ready for Ziro on http://localhost:${3000}`)
        })
    })
    .catch( ex => {
        console.error(ex.stack);
        process.exit(1);
    });
