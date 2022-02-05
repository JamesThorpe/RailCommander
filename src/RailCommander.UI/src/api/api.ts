import { Layout } from './types'
import { Locomotive } from './locomotive'

function LoadLayoutData(): Layout {
    return {
        Locomotives: [
            new Locomotive(5)
            ]
    }
}