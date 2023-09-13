import React from 'react'

const getFullUrl = (url: string, config?: { useDedicatedEnvironment: boolean }) => {
    const baseUrl = "http://localhost:5182"
    return `${baseUrl}${url}`;
};

export default  getFullUrl;