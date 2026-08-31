
import { Button } from '@heroui/react'


const JobApply = ({ job }) => {
    return (
        <div>
            <h2>Job info {job?.title}</h2>

            <Button>Apply Job</Button>
        </div>
    )
}

export default JobApply