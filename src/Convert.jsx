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
		ipc.send('start-processing', filePath)
		setProcessingStatus(true)
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
			<h3 className="my-5">
				Click the button below to select paths and start converting
			</h3>
			<button
				className="btn btn-success btn-lg mt-2 rounded-0"
				onClick={() => {
					ipc.send('select-folder')
				}}
			>
				{!finished ? 'Start' : 'Start Another Conversion'}
			</button>
			{processingStatus && (
				<div>
					<div className="spinner-border text-light mt-3"></div>
					<p>Converting...</p>
				</div>
			)}
			{finished && <p className="text-light mt-3">Conversion Finished</p>}
		</div>
	)
}

export default Convert
