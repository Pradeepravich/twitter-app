import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ResourceLoader = ({resourceUrl, resourceName, children}: any) => {

  const [resource, setResource] = useState(null);
  
  useEffect(()=>{
       (async()=>{
        const response = await axios.get(resourceUrl);
        setResource(response.data);
       })();
  },[resourceUrl])

  return (
    <>
    {React.Children.map(children, (child)=>{
        if(React.isValidElement(child)){
            return React.cloneElement(child, { [resourceName]: resource })
        }
        return child;

    })}

    </>
  )
}

export default ResourceLoader