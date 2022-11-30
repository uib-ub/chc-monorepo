import OpenAPIViewer from './OpenAPIViewer';
import openAPI from './openAPI.json'

function ApiDoc() {
  return (
    <main className='min-h-screen py-20 flex flex-grow flex-col justify-center content-center'>
      <OpenAPIViewer spec={openAPI} />
    </main>
  );
}

export default ApiDoc;