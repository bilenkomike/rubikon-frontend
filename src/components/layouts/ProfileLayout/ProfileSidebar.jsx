import {
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../stores/auth.store";
import { useI18n } from "../../../translations/i18nProvider";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const { logout } = useAuth();
  const { t } = useI18n();

  const menu = [
    {
      key: "profile",
      label: t.profile.profile,
      path: "",
      icon: <PersonOutlineIcon />,
    },
    {
      key: "orders",
      label: t.profile.orders,
      path: "orders",
      icon: <ReceiptLongOutlinedIcon />,
    },
    {
      key: "wishlist",
      label: t.profile.wishlist,
      path: "wishlist",
      icon: <FavoriteBorderOutlinedIcon />,
    },
    {
      key: "password",
      label: t.profile.change_password,
      path: "password",
      icon: <LockOutlinedIcon />,
    },
  ];

  return (
    <Paper sx={{ p: 1 }}>
      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.key}
            onClick={() => navigate(`/${lang}/profile/${item.path}`)}
            sx={{
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: "text.secondary",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}

        <Divider sx={{ my: 1 }} />

        {/* LOGOUT */}
        <ListItemButton
          onClick={() => {
            logout();
            navigate(`/${lang}`);
          }}
          sx={{
            borderRadius: 1,
            color: "error.main",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 36,
              color: "error.main",
            }}
          >
            <LogoutOutlinedIcon />
          </ListItemIcon>

          <ListItemText
            primary={t.profile.logout}
            onClick={() => {
              logout();
              navigate(`/${lang}`);
            }}
          />
        </ListItemButton>
      </List>
    </Paper>
  );
};

export default ProfileSidebar;
