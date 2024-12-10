import React from 'react'
import { useState, useEffect, useRef } from 'react'
export default function HomePage(props) {
    const{setfile, setaudioStream} = props

    const[recordingStatus, setRecordingStatus] = useState('inactive')
    const[audioChunks, setAudioChuncks]= useState([])
    const[duration, setDuration]=useState(0)

    const mediaRecorder= useRef(null)

    const mimeType = 'audio/webm'

    async function StartRecording() {
        let tempStream

        console.log('Start Recording')

        try{
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            tempStream = streamData
        } catch(err){
            console.log(err.message)
            return
        }

        setRecordingStatus('Recording')

        //create new media recorder
        const media = new MediaRecorder(tempStream,{type:mimeType})
        mediaRecorder.current= media
        
        mediaRecorder.current.start()
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable=(event)=>{
            if(typeof event.data=='undefined'){return}
            if(typeof event.data.size==0){return}
            localAudioChunks.push(event.data)
        }
        setAudioChuncks(localAudioChunks)
    }

    async function StopRecording() {
        setRecordingStatus('inactive')
        console.log('Stop Recording')

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop=()=>{
            const audioBlob = new Blob(audioChunks,{type: mimeType})
            setaudioStream(audioBlob)
            setAudioChuncks([])
            setDuration(0)
        }

    }

    useEffect(()=>{
        if(recordingStatus==='inactive'){return}

        const interval = setInterval(()=>{
            setDuration(curr => curr + 1)
        },1000)

        return ()=> clearInterval(interval)
    })

  return (
    <main className='flex-1 p-4 flex flex-col gap-3 text-center 
    sm:gap-4 md:gap-5 justify-center pb-20'>
        <h1 className='font-semibold text-5xl sm:text-6xl 
        md:text-7xl'>Vision<span className='text-purple-600 bold'>Scribe</span></h1>
        <h3 className='font-medim md:text-lg'>Record <span 
        className='text-purple-600'>&rarr;</span> Transcribe <span 
        className='text-purple-600'>&rarr;</span> Translate</h3>
        <button onClick={recordingStatus==='inactive'? StartRecording:StopRecording} className='flex items-center text-base justify-between 
        gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl'>
            <p className='text-purple-400'>{recordingStatus==='inactive'? 'Record' : 'Stop Recording' }</p>
            <div className='flex items-center gap-2'>
                {duration && (
                    <p className='text-sm'>{duration}s</p>
                )}
                <i className={"fa-solid duration-200 fa-microphone " + (
                    recordingStatus === 'Recording' ? ' text-rose-400' : "")}></i>
            </div>
            </button>
        <p className='text-base'>Or <label className='text-purple-300 text-lg bold cursor-pointer 
        hover:text-purple-600 duration-200'>Upload 
        <input onChange={(e)=>{
            const tempFile = e.target.files[0]
            setfile(tempFile)
        }} className='hidden' 
        type='file' accept='.mp3,.wave'/></label> a mp3 file</p>
        <p className='italic text-zinc-500'>"Free now Free Forever"</p>
    </main>
  )
}
