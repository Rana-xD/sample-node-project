#!/usr/bin/env node
// var app = require('./app');
var aws = require('./aws')
var compareImage = require('./compareImage');
// const bodyParser = require("body-parser");
var fs = require('fs');



// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// /**bodyParser.json(options)
//  * Parses the text as JSON and exposes the resulting object on req.body.
//  */
// app.use(bodyParser.json());

// app.get('/', (req, res, next) => {
//     res.status(200);
//     res.send({status:'OK'});
// });


    var designImage = "https://s3-ap-southeast-1.amazonaws.com/pu-ai-bc/img/B.png";
    var markupImage = "https://s3-ap-southeast-1.amazonaws.com/pu-ai-bc/img/A.png";
    var pathDesignImage, pathMarkupImage;
    var width = 980;


    var pathDesignImagePromise = aws.downloadImage(designImage,width);
    pathDesignImagePromise.then((path) => {
        pathDesignImage = path;
        var pathMarkupImagePromise = aws.downloadImage(markupImage,width);
        pathMarkupImagePromise.then((path) => {
            pathMarkupImage = path;
            compareImage.compareImage(pathDesignImage,pathMarkupImage).then((data)=>{
                if(data.code==="same")
            {
                // compareImage.deleteFile(pathDesignImage);
                // compareImage.deleteFile(pathMarkupImage);
                // res.send({
                //     code: "success",
                //     meesage:"same"
                // })
                console.log("same")
            }
            else{
                compareImage.getDiffPixelsCoords(pathDesignImage,pathMarkupImage).then((coordinate)=>{
                    // compareImage.deleteFile(pathDesignImage);
                    // compareImage.deleteFile(pathMarkupImage);
                    compareImage.getAveragePixelsCoords(coordinate).then((average)=>{
                        // res.send({
                        //     code: "success",
                        //     message: "different",
                        //     coordinate: average
                        // })
                        console.log(average);
                    },(error)=>{
                        console.log("ERROR WHEN CREAT AVERAGE"+error);
                        // res.send({
                        //     code: "fail",
                        //     message: error
                        // });
                    }).catch((error)=>{
                        console.log("ERROR WHEN CREAT AVERAGE"+error);
                        // res.send({
                        //     code: "fail",
                        //     message: error
                        // });
                    })
                    
                },(error)=>{
                    console.log("ERROR WHEN CREAT COORDIDATE"+error);
                    // res.send({
                    //     code: "fail",
                    //     message: error
                    // });
                }).catch((error)=>{
                    console.log("ERROR WHEN CREAT COORDIDATE"+error);
                    // res.send({
                    //     code: "fail",
                    //     message: error
                    // });
                });
            }
            },(error)=>{
                console.log("ERROR WHILE COMPARE: "+error);
                // res.send({
                //     code: "fail",
                //     message: error
                // });
            }).catch((error)=>{
                console.log("ERROR WHILE COMPARE: "+error);
                // res.send({
                //     code: "fail",
                //     message: error
                // });
            });
           },(error)=>{
            console.log("ERROR WHEN RESIZE MARKUP IMAGE: "+err);
            // res.send({
            //     code: "fail",
            //     message: error
            // }); 
           }).catch((err)=>{
            console.log("ERROR WHEN RESIZE MARKUP IMAGE: "+err);
            // res.send({
            //     code: "fail",
            //     message: error
            // });
           });
    }, (error) => {
        console.log("ERROR GET PATH DESIGN IMAGE: "+error);
        // res.send({
        //     code: "fail",
        //     message: error
        // });
    }).catch((error) => {
        console.log("ERROR GET PATH DESIGN IMAGE: "+error);
        // res.send({
        //     code: "fail",
        //     message: error
        // });
    });




// app.listen(3000);
