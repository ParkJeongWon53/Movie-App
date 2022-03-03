exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'JEONG',
      email: 'qkrwjd53@gmail.com'
    })
  }
}