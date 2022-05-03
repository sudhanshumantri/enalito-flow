import { Flow } from '@ui/components/flow/flow'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const FlowPage: NextPage = () => {
  const router = useRouter()
  const { flowId } = router.query

  const id = flowId as string | undefined
  return <Flow flowId={id} />
}

export default FlowPage
