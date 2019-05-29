const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs')

router.post(/^(\/mock\/)(.*)(\.json)$/, function (req, res, next) {
  console.log('mock router', req);
  const paths = req.url.split('mock/')
  if (paths.length > 2) {
    fs.readFile(path.resolve(__dirname, '../../' + path[1]), function (err, data) {
      if (err) {
        console.log(err)
      } else {
        res.send(data)
        res.end()
      }
    })
  }
})

module.exports = router

