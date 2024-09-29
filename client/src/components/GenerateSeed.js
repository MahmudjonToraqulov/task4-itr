import React from 'react'

function GenerateSeed(props) {
    const { seed, setSeed, generateRandomSeed } = props

  return (
    <div className="input-group mr-2 w-50">
        <input
            type="text"
            className="form-control"
            placeholder="Seed"
            value={seed}
            onChange={(e) => setSeed(e.target.value)} // Обновляем состояние при вводе
        />
        <button
            className="btn btn-primary ml-2 "
            onClick={generateRandomSeed}
        >
            Random Seed
        </button>
    </div>
  )
}

export default GenerateSeed
