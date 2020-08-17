import React, { useState } from 'react'
const electron = window.require('electron')
const ipc = electron.ipcRenderer

const Convert = () => {
	const [processingStatus, setProcessingStatus] = useState(false)

	ipc.on('toggle-status-true', (_, path) => {
		setProcessingStatus(true)
		// ipc.send('start-processing', path)
	})
	ipc.on('toggle-status-false', () => {
		setProcessingStatus(false)
	})
	return (
		<div className="text-center mt-5">
			<h1>Output Directory Path</h1>
			<input
				type="text"
				className="form-control form-control-lg form-control-plaintext w-50 mx-auto mb-5 rounded-0 bg-light"
				value="abc"
				readOnly
			/>
			<h1>Input File Path</h1>
			<input
				type="text"
				className="form-control form-control-lg form-control-plaintext w-50 mx-auto mb-5 rounded-0 bg-light"
				value="bcd"
				readOnly
			/>
			<h5>Chose the wrong path? Select Again</h5>
			<button className="btn btn-info mb-5 mt-2 rounded-0">
				Select Path Again
			</button>
			<h5>When ready, click the button below to start the conversion</h5>
			<button className="btn btn-success mt-2 rounded-0">Convert!</button>
			{processingStatus && (
				<>
					<div className="spinner-border text-light mt-3"></div>
					<p>Converting...</p>
				</>
			)}
		</div>
	)
}

export default Convert
