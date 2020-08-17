import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
	return (
		<div className="text-center d-flex flex-column align-items-center mt-5">
			<h1>Video Converter</h1>
			<h3 className="mt-3">Select Any File</h3>
			<button id="selectFile" className="btn btn-info mt-4">
				Select File
			</button>
		</div>
	)
}

export default App
