import { Box, Button } from "@mui/material";

const Toolbar = ({
  renderedSave,
  renderedSearch,
  renderedCancel,
  renderedConfirm,
  renderedClearFilters,
  onClickConfirm,
  onClickCancel,
  onClickClearFilters
}) => {
  return (
    <Box display="flex" justifyContent="end" mt="20px">
      {renderedSave && (
        <Button
          autoFocus
          type="submit"
          color="secondary"
          sx={{ m: 0.5 }}
          size="medium"
          style={{ width: "120px" }}
          variant="contained"
        >
          Salvar
        </Button>
      )}

      {renderedSearch && (
        <Button
          color="info"
          sx={{ m: 0.5 }}
          size="medium"
          type="submit"
          style={{ width: "120px" }}
          variant="contained"
        >
          Pesquisar
        </Button>
      )}

      {renderedConfirm && (
        <Button
          autoFocus
          type="submit"
          color="secondary"
          sx={{ m: 0.5 }}
          size="medium"
          style={{ width: "120px" }}
          variant="contained"
          onClick={onClickConfirm}
        >
          Confirmar
        </Button>
      )}

      {renderedCancel && (
        <Button
          onClick={onClickCancel}
          color="error"
          sx={{ m: 0.5 }}
          size="medium"
          style={{ width: "120px" }}
          variant="contained"
        >
          Cancelar
        </Button>
      )}

      {renderedClearFilters && (
        <Button
          type="reset"
          color="error"
          sx={{ m: 0.5 }}
          size="medium"
          style={{ width: "120px" }}
          variant="contained"
          onClick={onClickClearFilters}
        >
          Limpar Filtros
        </Button>
      )}
    </Box>
  );
};

export default Toolbar;
