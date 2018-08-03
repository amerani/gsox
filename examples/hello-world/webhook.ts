import * as http from 'http';
const testData = {
      notification: {
            id: 99,
            type: "email",
      }
}
const req = http.request({
      hostname: "localhost",
      port: 3000,
      method: "POST",
      headers: {
            "Content-Type": "application/json"
      },
      path: "/webhook"
}, (res) => {
      res.setEncoding('utf-8');
      res.on('data', console.log);
})
console.log(JSON.stringify(testData))
req.write(Buffer.from(JSON.stringify(testData)));
req.end();