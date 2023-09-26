import React from 'react'

const getFullUrl = (url: string, config?: { useDedicatedEnvironment: boolean }) => {
    const baseUrl = "https://akademates.com/backend"
    return `${baseUrl}${url}`;
};

export default  getFullUrl;