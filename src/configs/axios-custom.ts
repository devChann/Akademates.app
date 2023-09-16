import React from 'react'

const getFullUrl = (url: string, config?: { useDedicatedEnvironment: boolean }) => {
    const baseUrl = "http://24.144.120.53/backend"
    return `${baseUrl}${url}`;
};

export default  getFullUrl;