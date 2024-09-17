import { SiApple, SiAsus, SiBeatsbydre, SiBose, SiDell, SiHitachi, SiHp, SiHuawei, SiJbl, SiLg, SiMicrosoft, SiNokia, SiPanasonic, SiSamsung, SiSony, SiToshiba, SiXiaomi } from 'react-icons/si'
import Container from './Container'

const DistributedBrands = () => {
	return (
		<Container>
			<span className='items-center justify-center text-center text-2xl font-bold mb-8 hidden md:flex'>Brands We Distribute</span>
			<div className='w-full gap-8 overflow-y-hidden text-6xl hidden md:inline-flex'>
				<SiHp className='text-gray-400 hover:text-darkText duration-200'/>
				<SiSony className='text-gray-400 hover:text-darkText duration-200'/>
				<SiXiaomi className='text-gray-400 hover:text-darkText duration-200'/>
				<SiAsus className='text-gray-400 hover:text-darkText duration-200'/>
				<SiJbl className='text-gray-400 hover:text-darkText duration-200'/>
				<SiSamsung className='text-gray-400 hover:text-darkText duration-200'/>
				<SiLg className='text-gray-400 hover:text-darkText duration-200'/>
				<SiApple className='text-gray-400 hover:text-darkText duration-200'/>
				<SiMicrosoft className='text-gray-400 hover:text-darkText duration-200'/>
				<SiDell className='text-gray-400 hover:text-darkText duration-200'/>
				<SiHuawei className='text-gray-400 hover:text-darkText duration-200'/>
				<SiBose className='text-gray-400 hover:text-darkText duration-200'/>
				<SiBeatsbydre className='text-gray-400 hover:text-darkText duration-200'/>
				<SiToshiba className='text-gray-400 hover:text-darkText duration-200'/>
				<SiHitachi className='text-gray-400 hover:text-darkText duration-200'/>
				<SiPanasonic className='text-gray-400 hover:text-darkText duration-200'/>
				<SiNokia className='text-gray-400 hover:text-darkText duration-200'/>
			</div>
		</Container>
	)
}

export default DistributedBrands