import {Media, Post} from "../../../../../models";

export default async function (req, res) {
    try {
        const { postId } = req.params;

        const post = await Post.findByPk(
            postId,
            {
                include: [{ model: Media, as: 'medias' }],
                attributes: ['userId', 'name', 'cadNum', 'type', 'areaHectares', 'purpose', 'cost', 'currency', 'description', 'shape'],

            }
        );

        if (!post) {
            const error = { error: 'The post is not exists.' };
            return res.status(400).json(error);
        }
        return res.status(200).send(post);
    } catch (err){
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
