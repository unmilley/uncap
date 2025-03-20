import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

export const useAuth = () => {
	const auth = useFirebaseAuth()!
	const { createInfo } = useInfo()

	const handleSignWithProvider = async (provider: 'github' | 'google') => {
		try {
			const $provider =
				provider === 'github' ? new GithubAuthProvider() : provider === 'google' ? new GoogleAuthProvider() : null
			if (!$provider) throw Error('No provider! how?')
			const result = await signInWithPopup(auth, $provider)
			const username = result.user.displayName || result.user.providerData[0].displayName || 'unknown'
			await createInfo({ name: username, bill: 0, locale: 'ru-RU' })
		} catch (error) {
			console.log(error)
		}
	}

	return {
		handleSignWithProvider,
		logout: signOut(auth),
	}
}
