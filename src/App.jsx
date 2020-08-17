import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
const electron = window.require('electron')
const ipc = electron.ipcRenderer

const App = () => {
	return (
		<div className="text-center d-flex flex-column align-items-center mt-5 mx-5">
			<h1>Welcome to Video Converter</h1>
			<h3 className="my-3">This app converts MP4 files to HLS File</h3>
			<p className="mt-5">
				HLS streaming (HTTP Live Streaming) has emerged as the standard in
				adaptive bitrate video.{' '}
			</p>
			<p>
				Adaptive bitrate video delivery is a combination of server and client
				software that detects a client's bandwidth capacity and adjusts the
				quality of the video stream between multiple bitrates and/or
				resolutions.
			</p>
			<p>
				Various Streaming platforms such as Youtube, Amazon Prime and Netflix
				use HLS to provide seamless video playback experience.
			</p>

			<h5 className="text-danger p-3 border border-light mt-5">
				Steps to Convert a File
				<div className="text-muted">
					<ol className="text-left">
						<li>Select from New Project from the Menu Option</li>
						<li>Select MP4 File to Be Converted</li>
					</ol>
				</div>
			</h5>
			<h3 className="mt-3">Select Folder and File to Continue</h3>
			<button
				id="selectFile"
				className="btn btn-info mt-4"
				onClick={() => {
					ipc.send('select-folder')
				}}
			>
				Select
			</button>
		</div>
	)
}

export default App
