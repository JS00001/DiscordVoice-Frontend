import React, { useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import {BsHeadphones, BsTelephoneXFill} from 'react-icons/bs';
import {FaMicrophoneSlash} from 'react-icons/fa';


export default function Home() {
  const [disconnecting, setDisconnecting] = React.useState(false);
  const [deafened, setDeafened] = React.useState(false);
  const [muted, setMuted] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState('');

  const url = 'https://example.com'

  const handleChange = (event) => {
    setUser(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser('');
    axios.get(url + '/update/user?user=' + user);
  }

  const handleMute = () => {
    setMuted(!muted);
    axios.get(url + '/update/mute');
  }

  const handleDeafen = () => {
    setDeafened(!deafened)
    axios.get(url + '/update/deafen');
  }

  const handleDisconnect = () => {
    setDisconnecting(!disconnecting);
    axios.get(url + '/update/disconnect');
  }

  useEffect(() => {
    axios.get('https://api.jsenyitko.tech/status')
    .then(res => {
      const {muteEnabled, deafenedEnabled, disconnectEnabled} = res.data;
      setDisconnecting(disconnectEnabled)
      setDeafened(deafenedEnabled);
      setMuted(muteEnabled);
      setLoading(false)
    })
  })


  if (loading) return <h1>Loading</h1>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-zinc-800">
      <Head>
        <title>Voice Manager</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-black tracking-tight text-white font-sans">
          Update and Manage{' '}
        </h1>
        <h1 className='text-6xl font-black tracking-tight text-white font-sans'>
          Your{' '}
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'>
            Members
          </span>
        </h1>

        <div className="grid grid-cols-3 gap-x-5 items-stretch mt-10">
          <div onClick={handleMute} className={`p-5 border-2 rounded-md ${muted ? 'border-blue-700' : 'border-zinc-700'} ${muted ? 'text-blue-700' : 'text-gray-400'} ${muted && 'bg-slate-800'} hover:text-blue-700 hover:bg-slate-800 hover:border-blue-700 hover:cursor-pointer`}>
            <div className='pl-8 pb-4'> 
              <FaMicrophoneSlash className='text-5xl'/>
            </div>
            <h1 className='text-l font-semibold'>
              Auto Mute
            </h1>
          </div>

          <div onClick={handleDisconnect} className={`p-5 border-2 rounded-md ${disconnecting ? 'border-blue-700' : 'border-zinc-700'} ${disconnecting ? 'text-blue-700' : 'text-gray-400'} ${disconnecting && 'bg-slate-800'} hover:text-blue-700 hover:bg-slate-800 hover:border-blue-700 hover:cursor-pointer`}>
            <div className='pl-8 pb-4'> 
              <BsTelephoneXFill className='text-5xl'/>
            </div>
            <h1 className='text-l font-semibold'>
              Auto Disconnect
            </h1>
          </div>

          <div onClick={handleDeafen} className={`p-5 border-2 rounded-md ${deafened ? 'border-blue-700' : 'border-zinc-700'} ${deafened ? 'text-blue-700' : 'text-gray-400'} ${deafened && 'bg-slate-800'} hover:text-blue-700 hover:bg-slate-800 hover:border-blue-700 hover:cursor-pointer`}>
            <div className='pl-8 pb-4'> 
              <BsHeadphones className='text-5xl'/>
            </div>
            <h1 className='text-l font-semibold'>
              Auto Deafen
            </h1>
          </div>
        </div>

        <form className='pt-10 w-max' onSubmit={handleSubmit}>
          <input className='p-2 rounded-lg w-96' type="text" onChange={handleChange} value={user}>New User ID</input> 
          <input className='bg-blue-700 py-2 px-9 ml-5 rounded-lg text-white font-semibold hover:cursor-pointer hover:bg-blue-800' type="submit" value="Set ID"/>
        </form>
      </main>

    </div>
  )
}
