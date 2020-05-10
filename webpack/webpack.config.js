const path=require('path')
module.exports={
    //编译模式  developmen(开发模式)  production(发布模式)
    mode:'development',
    //输入文件路径
    entry:path.join(__dirname,'./src/index.js'),
    //输出文件的路径
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {
                test:/\.jpeg|jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                //其中`?`之后的loader的参数项 
               //limit用来指定图片的大小，单位是字节（byte）,只有小于limit的图片，才会被转为base64的图片
                use:'url-loader?limit=131876'
              }
        ]
    }
}