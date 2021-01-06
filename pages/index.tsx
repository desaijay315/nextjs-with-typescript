import { NextPage } from "next";
import { withApollo } from '../lib/apollo';
import { TaskStatus, useTasksQuery } from "../generated/graphql";

interface IntialProps { }

interface Props extends IntialProps { }

const Home: NextPage<Props, IntialProps> = () => {

    const { loading, error, data } = useTasksQuery({
        variables: {
            status: TaskStatus.Active
        },
        notifyOnNetworkStatusChange: true
    })

    if (loading) {
        return <p>Loading...</p>
    } else if (error) {
        return <div>
            <div> you got query failed for some reasons</div>
            <div> {error?.message}</div>
        </div>;
    }
    const tasks = data?.tasks;
    return tasks ? <ul>{tasks.map(task => {
        return <li key={task.id}>
            {task.title}
        </li>
    })}</ul> : <p>There are no tasks here.</p>
}

Home.getInitialProps = async () => ({
    greeting: 'Hello World'
})

export default withApollo({ ssr: true })(Home);
