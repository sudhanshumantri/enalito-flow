import { useGetFlowListQuery } from '@api/flow-api'
import { FlowInfo } from '@api/models'
import Link from 'next/link'

export const FlowHome = () => {
  const { data, error, isLoading } = useGetFlowListQuery()
  const debugBlacklisted = [
    '6233ada531bb7534b7d0a909',
    '6233b00931bb7534b7d0a90b',
    '6233af9b31bb7534b7d0a90a',
    '6233bd6331bb7534b7d0a90c',
    '623037424fb0f22fe511a023',
  ]
  return <>
    {isLoading
      ? 'Loading...'
      : error
        ? `Error. ${(error as any).error}`
        : data?.data
          ? <ul>
            {data.data
              .filter(flow => !debugBlacklisted.includes(flow._id))
              .map(flow =>
                <li key={flow._id}>
                  <Link href={`/flow/${flow._id}`}>
                    <a>{flow.name}</a>
                  </Link>
                </li>
              )
            }</ul>
          : <></>
    }
    <Link href="/flow">
      <a>Create New</a>
    </Link>
  </>
}