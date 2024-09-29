import React from 'react'

function GeneratorTable(props) {
    const { handleScroll, data, isLoading } = props

  return (
    <div className="table-container" onScroll={handleScroll} style={{ 'max-height':'750px', 'overflow-y':'auto' }} >
        <table className="table table-dark border">
            <thead className="">
            <tr>
                <th className='px-2 py-3 text-center' >Id</th>
                <th className='px-2 py-3' >UUID</th>
                <th className='px-2 py-3' >Name</th>
                <th className='px-2 py-3' >Address</th>
                <th className='px-2 py-3' >Phone</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={item.uuid}>
                     <td className='px-2 py-3 text-center'>{index + 1}</td>
                     <td className='px-2 py-3'>{item.uuid}</td>
                     <td className='px-2 py-3'>{item.name}</td>
                     <td className='px-2 py-3'>{item.address}</td>
                     <td className='px-2 py-3'>{item.phone}</td>
                </tr>
            ))}
            </tbody>
        </table>

        {isLoading && <div>Loading...</div>}
    </div>
  )
}

export default GeneratorTable
