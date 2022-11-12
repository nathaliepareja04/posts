import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SPACING } from "../config/spacing.js";
import { colors } from "../config/colors.js";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import FormContainer from "../components/Form/FormContainer.jsx";
import FormInput from "../components/Form/FormInput.jsx";
import FormSubmitButton from "../components/Form/FormSubmitButton.jsx";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "titulo invalido")
    .required("titulo es requerido"),

  description: Yup.string()
    .trim()
    .min(3, "descripcion invalida")
    .required("descripcion es requerido"),
});

export default function PostActionScreen({ route }) {
  const post = route.params;

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(post?.imgUrl || "");

  const postInfo = {
    title: post?.title || "",
    description: post?.description || "",
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    // console.log(result.split("/")[9])
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const savePost = async (formData) => {
    try {
      setIsLoading(true);
      await axios.post("/post", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error en savePost", error.message);
    }
  };

  const updatePost = async (formData) => {
    try {
      setIsLoading(true);
      await axios.put(`/post/${post._id}`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error en updatePost", error.message);
    }
  };

  const actions = async (values, formikActions) => {
    // console.log(post)

    const { title, description } = values;
    const formData = new FormData();

    if (post) {
      if (post.imgUrl !== image) {
        formData.append("img", {
          name: image.split("/")[9],
          uri: image,
          type: "image/jpg",
        });
      }
    } else {
      if (image) {
        formData.append("img", {
          name: image.split("/")[9],
          uri: image,
          type: "image/jpg",
        });
      }
    }

    formData.append("title", title);
    formData.append("description", description);

    post ? await updatePost(formData) : await savePost(formData);

    formikActions.resetForm();
    formikActions.setSubmitting(false);

    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator color="white" size={80} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <FormContainer>
          <Formik
            initialValues={postInfo}
            validationSchema={validationSchema}
            onSubmit={actions}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => {
              const { title, description } = values;

              return (
                <>
                  <FormInput
                    value={title}
                    error={touched.title && errors.title}
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("titulo")}
                    label="Titulo"
                    placeholder="Titulo"
                  />

                  <FormInput
                    value={description}
                    error={touched.description && errors.description}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("descripcion")}
                    label="Descripcion"
                    placeholder="Descripcion"
                  />

                  <View>
                    <TouchableOpacity
                      style={styles.uploadBtnContainer}
                      onPress={() => pickImage()}
                    >
                      {image ? (
                        <Image
                          source={{ uri: image }}
                          style={{ with: "100%", height: "100%" }}
                        />
                      ) : (
                        <Text style={styles.uploadBtn}>Seleccionar Imagen</Text>
                      )}
                    </TouchableOpacity>
                  </View>

                  <FormSubmitButton
                    submitting={isSubmitting}
                    onPress={handleSubmit}
                    title={post ? "Actualizar" : "Guardar"}
                  />
                </>
              );
            }}
          </Formik>
        </FormContainer>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING * 2,
  },

  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 60,
    borderColor: colors.light,
    justifyContent: "center",
    // alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
    marginVertical: 10,

    // marginLeft: 100,
  },

  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
    color: colors.light,
  },

  backButton: {
    position: "absolute",
    top: 30,
    left: 5,
  },
});
