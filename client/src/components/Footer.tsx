import githubImg from '../static/github.png'

function Footer() {
  const style = {
    footer: `w-full h-12 bg-[#111625AA] flex items-center justify-center fixed bottom-0 text-white border-t border-gray-600	`,
  }
  return (
    <div className={style.footer}>
      <a
        className='flex items-center justify-center text-sm'
        href='https://github.com/junbin123/web3-project'
        target='_blank'
        rel='noreferrer'
      >
        <img className='h-4 w-4 rounded-full block mr-2' src={githubImg}></img>
        Github
      </a>
    </div>
  )
}
export default Footer
