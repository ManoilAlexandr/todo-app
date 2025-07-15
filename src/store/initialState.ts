import { Layout, type EntityContainer } from "../types";

const estimationTodo = [
    {
        id: 1,
        title: "Hello world",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, quia facere. Asperiores voluptatibus repudiandae aut?",
    },
    {
        id: 2,
        title: "Homework",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae dolor quaerat laboriosam fuga ut vel repellendus, perspiciatis, dicta sapiente illo temporibus, architecto voluptatum expedita unde quisquam cum minus laborum illum quis debitis corporis! Obcaecati deserunt unde nihil possimus ipsum vel autem sed iusto quia aspernatur ipsa iure, tenetur tempora voluptate commodi. Fuga adipisci a accusamus nam omnis eum autem voluptatem distinctio repellat vitae maiores illo iusto quibusdam voluptatibus totam, quas nihil. Quas tenetur delectus suscipit. Minus accusamus incidunt eos, distinctio aspernatur explicabo magnam, beatae voluptates deleniti odio ex consectetur quisquam harum unde hic saepe iusto alias laborum modi? Corporis, iure!`,
    },
    {
        id: 3,
        title: "Do some things",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, quia facere. Asperiores voluptatibus repudiandae aut?",
    },
];

const inWorkTodo = [
    {
        id: 4,
        title: "Hello world",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, quia facere. Asperiores voluptatibus repudiandae aut?",
    },
    {
        id: 5,
        title: "Homework",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, quia facere. Asperiores voluptatibus repudiandae aut?",
    },
    {
        id: 6,
        title: "Do some things",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, quia facere. Asperiores voluptatibus repudiandae aut?",
    },
    {
        id: 7,
        title: "Do some things",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, quia facere. Asperiores voluptatibus repudiandae aut?",
    },
];

export const initialContainers: EntityContainer[] = [
    {
        id: Layout.Todo,
        items: estimationTodo,
        title: Layout.Todo,
    },
    {
        id: Layout.InProgress,
        items: inWorkTodo,
        title: Layout.InProgress,
    },
    {
        id: Layout.Done,
        items: [],
        title: Layout.Done,
    },
];
