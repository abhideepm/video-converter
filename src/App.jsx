import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
const electron = window.require('electron')
const ipc = electron.ipcRenderer

const App = () => {
	return (
		<div className="text-justify d-flex flex-column align-items-center mt-5 mx-5">
			<h1>Welcome to Video Converter</h1>
			<h3 className="mt-3">This app converts MP4 files to HLS File</h3>
			<p>
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
			{/* <h3 className="mt-3">Select Any File</h3> */}
			{/* <button
				id="selectFile"
				className="btn btn-info mt-4"
				onClick={() => {
					ipc.send('open-select-file')
				}}
			>
				Select File
			</button> */}
		</div>
	)
}

export default App
