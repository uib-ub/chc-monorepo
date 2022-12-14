export const Subjects = ({ value, language }: any) => {

  return (
    <div className='flex flex-wrap justify-center gap-3'>
      {value.map((i: any) => (
        <div key={i._id} className={`text-sm font-light bg-gray-100 dark:bg-black border border-gray-400 px-3 py-1 rounded-sm`}>
          {i.label[language] ?? 'Missing label'}
        </div>
      ))}
    </div>
  )
}