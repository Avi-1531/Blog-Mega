import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import service from "../../../appwrite/configuration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  // console.log(post);
  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth.userdata);
  console.log(userdata);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
        // featuredimage: post?.featuredimage || "",
      },
    });

  const submit = async (data) => {
    // console.log(data);
    // data.featuredimage = data.featuredimage || null;
    // console.log(data.featuredimage);
    // if (post) {
    //   const file = data.image[0]
    //     ? await service.uploadfile(data.image[0])
    //     : null;
    //   //    if new file is created so delete old posts
    //   if (file) {
    //     if (post.featuredimage) {
    //       service.deletefile(post.featuredimage);
    //     }

    //     data.featuredimage = file.$id;

    //     const dbpost = await service.updatepost(post ? post.$id : null, {
    //       ...data,
    //       // featuredimage: file ? file.$id : undefined,
    //     });
    //     if (dbpost) {
    //       navigate(`/post/${dbpost.$id}`);
    //     }
    //   }
    // } else {
    //   // const file = await service.uploadfile(data.image[0]);
    //   const file = data.image[0]
    //     ? await service.uploadfile(data.image[0])
    //     : null;
    //   // console.log("############");
    //   // console.log(file);

    //   if (file) {
    //     const fileId = file.$id;
    //     data.featuredimage = fileId;
    //   } else {
    //     data.featuredimage = userdata.$id;
    //   }
    //   const dbpost = await service.createpost({
    //     ...data,
    //     userid: userdata.$id,
    //   });
    //   if (dbpost) {
    //     navigate(`/post/${dbpost.$id}`);
    //   }
    // }

    if (post) {
      const file = data.image[0]
        ? await service.uploadfile(data.image[0])
        : null;

      if (file) {
        service.deletefile(post.featuredimage);
      }

      const dbPost = await service.updatepost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await service.uploadfile(data.image[0]);

      if (file) {
        const fileId = file.$id;

        const dbPost = await service.createpost({
          ...data,
          featuredimage: fileId,
          userid: userdata.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugtransform = useCallback((value) => {
    if (value && typeof value === "string") {
      // console.log(value);
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugtransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugtransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugtransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getfilepreview(post.featuredimage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
