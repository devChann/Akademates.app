import React from 'react'

const getFullUrl = (
    url: string,
    config?: { useDedicatedEnvironment: boolean }
  ) => {
    //7290
    const baseUrl = "https://localhost:7290";
    // const baseUrl = "http://localhost:5182"
    return `${baseUrl}${url}`;
  };

  export default  getFullUrl;