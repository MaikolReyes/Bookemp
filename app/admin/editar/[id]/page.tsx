export const dynamic = "force-dynamic";

interface Props {
    params: {
        id: string;
    };
}

export default function EditarPage({ params }: Props) {
    return (
        <div>
            Editando ID: {params.id}
        </div>
    );
}
