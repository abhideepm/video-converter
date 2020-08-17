import React, { useState } from 'react'
const electron = window.require('electron')
const ipc = electron.ipcRenderer
const path = window.require('path')

const Convert = () => {
	const [processingStatus, setProcessingStatus] = useState(false)
	const [outputPath, setOutputPath] = useState('')
	const [inputPath, setInputPath] = useState('')
	const [finished, setFinished] = useState(false)

	ipc.on('toggle-status-true', (_, filePath, folderPath) => {
		setOutputPath(folderPath)
		setInputPath(filePath.slice(0))
		// ipc.send('start-processing', inputPath)
	})
	ipc.on('toggle-status-false', () => {
		setProcessingStatus(false)
		setFinished(true)
	})

	return (
		<div className="text-center mt-5">
			<h1>Output Directory Path</h1>
			<input
				type="text"
				className="form-control form-control-lg form-control-plaintext w-50 mx-auto mb-5 rounded-0 bg-light"
				value={outputPath}
				readOnly
			/>
			<h1>Input File Path</h1>
			<input
				type="text"
				className="form-control form-control-lg form-control-plaintext w-50 mx-auto mb-5 rounded-0 bg-light"
				value={path.basename(inputPath)}
				readOnly
			/>
			<h3>Click the button below to start the conversion</h3>
			<button
				className="btn btn-success btn-lg mt-2 mb-5 rounded-0"
				onClick={() => {
					setProcessingStatus(true)
					ipc.send('start-processing', inputPath)
				}}
			>
				Convert!
			</button>
			<h5>Chose the wrong path? Select Again</h5>
			<button
				className="btn btn-info mb-5 mt-2 rounded-0"
				onClick={() => {
					ipc.send('select-folder')
				}}
			>
				Select Path Again
			</button>
			{processingStatus && (
				<div>
					<div className="spinner-border text-light mt-3"></div>
					<p>Converting...</p>
				</div>
			)}
			{finished && <p className="text-success">Conversion Finished</p>}
		</div>
	)
}

export default Convert
