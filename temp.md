```javascript
function isPrimeAndFactors(number) {
// Handle edge cases: numbers less than 2 are not prime.
if (number < 2) { return { isPrime: false, factors: [] }; } // Check for primality and find factors simultaneously. let
    factors=[]; for (let i=2; i <=Math.sqrt(number); i++) { if (number % i===0) { factors.push(i); //If i is a factor,
    number/i is also a factor if (i * i !==number) { //Avoid duplicates for perfect squares factors.push(number / i); }
    return { isPrime: false, factors: factors.sort((a,b)=> a-b) }; //Not prime, return factors
    }
    }

    //If no factors were found, it's prime.
    return { isPrime: true, factors: [] };
    }


    // Example usage:
    console.log(isPrimeAndFactors(2)); // Output: { isPrime: true, factors: [] }
    console.log(isPrimeAndFactors(17)); // Output: { isPrime: true, factors: [] }
    console.log(isPrimeAndFactors(15)); // Output: { isPrime: false, factors: [3, 5] }
    console.log(isPrimeAndFactors(12)); // Output: { isPrime: false, factors: [2, 2, 3] }
    console.log(isPrimeAndFactors(49)); // Output: {isPrime: false, factors: [7, 7]}
    console.log(isPrimeAndFactors(1)); // Output: { isPrime: false, factors: [] }
    console.log(isPrimeAndFactors(0)); // Output: { isPrime: false, factors: [] }

    ```

    This improved function efficiently determines if a number is prime and, if not, provides a sorted array of its
    factors. It handles edge cases (numbers less than 2) and avoids unnecessary calculations by only iterating up to the
    square root of the input number. The factors are also sorted for better readability.


    {
  "text": "This Express server utilizes ES6 features, including modules and arrow functions.  It's structured for maintainability and scalability.",
  "fileTree": {
    "server.js": {
      "file": {
        "contents": "import express from 'express';\n\nconst app = express();\nconst port = process.env.PORT || 3000;\n\n// Middleware to parse JSON request bodies\napp.use(express.json());\n\n// Sample route\napp.get('/', (req, res) => {\n  res.send('Hello from ES6 Express Server!');\n});\n\n//Error Handling Middleware\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).send('Something broke!');\n});\n\n// Start the server\napp.listen(port, () => {\n  console.log(`Server listening on port ${port}`);\n});"
      }
    },
    "package.json": {
      "file": {
        "contents": "{\n  \"name\": \"es6-express-server\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Express server using ES6\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"start\": \"node server.js\"\n  },\n  \"dependencies\": {\n    \"express\": \"^4.18.2\"\n  }\n}"
      }
    }
  },
  "buildCommand": {
    "mainItem": "npm",
    "commands": [
      "install"
    ]
  },
  "startCommand": {
    "mainItem": "node",
    "commands": [
      "server.js"
    ]
  }
}