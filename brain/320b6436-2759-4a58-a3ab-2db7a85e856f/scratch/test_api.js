async function testApi() {
  const username = "HasanBozkurt";
  const url = `http://localhost:3000/api/user/avatar?username=${username}`;
  
  try {
    console.log(`Fetching ${url}...`);
    const res = await fetch(url);
    const data = await res.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.log('FETCH ERROR:', err.message);
  }
}

testApi();
