import { NextPage, NextPageContext } from "next";
import { withApollo } from '../lib/apollo';
import { TaskStatus, useTasksQuery } from "../generated/graphql";
import TaskList from "../components/TaskList";
import CreateTaskForm from "../components/CreateTaskForm";
import { useRouter } from "next/router";
import TaskFilter from "../components/TaskFilter";
import { createContext } from "react";

interface IntialProps {
    ssr: boolean
}

interface Props extends IntialProps { }

interface TaskFilterContextValue {
    status?: TaskStatus;
}

export const TaskFilterContext = createContext<TaskFilterContextValue>({})

const Home: NextPage<Props, IntialProps> = ({ ssr }) => {
    const router = useRouter();
    const status = typeof router.query.status === "string" ? router.query.status as TaskStatus : undefined;
    const { loading, error, data, refetch } = useTasksQuery({
        variables: {
            status: status
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: ssr ? 'cache-first' : 'cache-and-network'
    })

    if (loading && !data?.tasks) {
        return <p>Loading...</p>
    } else if (error) {
        return <div>
            <div> you got query failed for some reasons</div>
            <div> {error?.message}</div>
        </div>;
    }
    const tasks = data?.tasks;

    const taskFilter = { status };
    return (
        <TaskFilterContext.Provider value={taskFilter}>
            <CreateTaskForm onTaskCreated={refetch} />
            {tasks ? <TaskList tasks={tasks} /> : <p>There are no tasks here.</p>}
            <TaskFilter />
        </TaskFilterContext.Provider>
    )
}

Home.getInitialProps = async (ctx: NextPageContext) => {
    return {
        ssr: !!ctx.req
    };
}

export default withApollo({ ssr: true })(Home);
