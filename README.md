# langchain-js
ApertureDB as langchain vector store in javascript

This is very much in testing phase, but serves as a good resource to build an application with ApertureDB in Javascript (for Node)

Based on the ApertureDB [client](https://github.com/coffeeblackai/aperturedb-node) in Javascript written by Peyton (Coffeeblack.ai)

## Configuration

Ensure you have a `.env` file in the root of your project with the following variables:

```
APERTURE_HOST=<your-aperture-host>
APERTURE_USER=<your-aperture-username>
APERTURE_PASSWORD=<your-aperture-password>
LOG_LEVEL=INFO
LANGCHAIN_DESCCRIPTOR_SET=lcjs
LANGCHAIN_DESCCRIPTOR_DIMENSIONS=3072
```