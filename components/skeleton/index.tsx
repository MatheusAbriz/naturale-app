  import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Skeleton as SkeletonGlue, SkeletonText as SkeletonTextGlue } from '@/components/ui/skeleton';

  type SkeletonProps = {
    count?: number
  }

  export function Skeleton({ count=1 }: SkeletonProps) {
    return (<>
      {Array.from({ length: count }).map((_, index) => (
        <Box 
          key={index}
          className="w-full gap-4 p-3 rounded-md bg-background-100 my-3 bg-gray-300"
          >
          <HStack className="gap-1 align-middle">
            <SkeletonGlue 
              variant="circular"
              className="h-[24px] w-[28px] mr-2 bg-gray-400" 
            />
            <SkeletonTextGlue _lines={2} gap={1} className="h-2 w-2/5 bg-gray-400" />
          </HStack>
          <SkeletonGlue variant="sharp" className="h-[100px] bg-gray-400" />
          <SkeletonTextGlue _lines={3} className="h-2 bg-gray-400" />
        </Box>
      ))}
    </>);
  }
